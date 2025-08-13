import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { request, response } from "express";
import mqtt from "mqtt"
import { config } from "./config.mjs"
import { Device, getAllDevices, getDevice } from "./device.mjs"

/* ----------------------------------------- MPC ----------------------------------------- */
function getServer() {
  const server = new McpServer({ name: "MCP Server Vitaly Doroganov", version: "0.0.1" });

  /*server.resource("getAllDevices", "Get devices", {}, async () => {
    return { content: getAllDevices() };
  });*/

  server.tool(
    "getAllDevices",
    "Get all devices",
    async () => {
      return { content: getAllDevices() };
    }
  );

  server.tool(
    "exampleTool",
    "An example tool that echoes input",
    async () => {
      return { content: [{ type: "text", text: `Echo` }] };
    }
  );
  return server;
}

const app = express();
app.use(express.json());
app.post("/mcp", async (req: request, res: response) => {
  try {
    const server = getServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    
    res.on("close", () => { 
      console.log("Request closed");
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } 
  catch (error) {
    console.error("Error handling request:", error);
    if (!res.headersSent) {
      res.status(500).json({ 
        jsonrpc: "2.0", 
        error: { code: -32603, message: "Internal Server Error" },
        id: null
      });
    }
  }
});

/* ----------------------------------------- MQTT ----------------------------------------- */
global.devices = [];
if (config.devices) {
  config.devices.forEach(opts => {
    global.devices.push(new Device(opts));
  });
}

const subscriptions = [];
global.devices.forEach(device => {
  device.data.custom_data.mqtt.forEach(mqtt => {
    const { instances, state: topic, sensor } = mqtt;
    if (instances != undefined && topic != undefined) {
      subscriptions.push({ deviceId: device.data.id, instances, topic, sensor });
    }
  });
});

//return;
global.mqttClient = mqtt.connect(`mqtt://${config.mqtt.host}`, {
  port: config.mqtt.port,
  username: config.mqtt.user,
  password: config.mqtt.password
}).on('connect', () => { /* on connect event handler */
  mqttClient.subscribe(subscriptions.map(pair => pair.topic));
}).on('offline', () => { /* on offline event handler */
  /* */
}).on('message', (topic, message) => { /* on get message event handler */
  //console.log('Received Message',topic, message.toString());
  const subscription = subscriptions.find(sub => topic.toLowerCase() === sub.topic.toLowerCase());
  //console.log('subscription', subscription)
  if (subscription == undefined) return;

  const { deviceId, instances, sensor } = subscription;
  const ldevice = global.devices.find(d => d.data.id == deviceId);

  instances.forEach(instance => {
    if (!ldevice.updateState(`${message}`, instance, sensor)) return;
  });
});

/* ----------------------------------------- Start ----------------------------------------- */
app.listen(3000, () => { 
  console.log("MCP server listening on port 3000");
});