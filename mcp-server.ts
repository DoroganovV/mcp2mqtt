import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { request, response } from "express";
import mqtt from "mqtt"
import { config } from "./config.mjs"
import { Device, getAllDevices, getDevice, setDeviceValue } from "./device.mjs"
import { z } from "zod";

function getServer() {
  const server = new McpServer({ name: "MCP Server Vitaly Doroganov", version: "0.0.1" });

  server.tool(
    "getAllDevices",
    "Get all devices",
    async () => {
      return { content: getAllDevices() };
    }
  );

  server.tool(
    "getDevice",
    "Get capabilities and properties of device",
    {
      deviceId: z.string().describe('Device ID'),
    },
    async ({ deviceId }) => {
      return { content: [{ type: "text", text: getDevice(deviceId) }] };
    }
  );

  server.tool(
    "setDeviceInstanceValue",
    "Set capability value of device",
    {
      deviceId: z.string().describe('Device ID'),
      instance: z.string().describe('Instance name'),
      value: z.string().describe('Value to set'),
    },
    async ({ deviceId, instance, value }) => {
      return { content: [{ type: "text", text: setDeviceValue(deviceId, instance, value) }] };
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


/* cache devices from config to global */
global.devices = [];
if (config.devices) {
  config.devices.forEach(opts => {
    global.devices.push(new Device(opts));
  });
}

/* create subscriptions array */
const subscriptions = [];
global.devices.forEach(device => {
  device.data.custom_data.mqtt.forEach(mqtt => {
    const { instance, state: topic } = mqtt;
    if (instance != undefined && topic != undefined) {
      subscriptions.push({ deviceId: device.data.id, instance, topic });
    }
  });
});

/* Create MQTT client (variable) in global */
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

  const { deviceId, instance } = subscription;
  const ldevice = global.devices.find(d => d.data.id == deviceId);

  if (!ldevice.updateState(`${message}`, instance)) return;
});

app.listen(3000, () => {
  console.log("MCP server listening on port 3000");
});