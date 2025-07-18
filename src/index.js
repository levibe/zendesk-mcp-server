#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Configure environment variables with absolute path for Claude Desktop compatibility
const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

// Import server after environment is configured
const { server } = await import('./server.js')

// Initialize MCP transport - uses stdin/stdout for communication
const transport = new StdioServerTransport()
await server.connect(transport)
