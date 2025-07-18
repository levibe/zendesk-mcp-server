#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import dotenv from 'dotenv'

// Load environment variables first
dotenv.config()

// Import server after environment variables are loaded
const { server } = await import('./server.js')

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport()
await server.connect(transport)
