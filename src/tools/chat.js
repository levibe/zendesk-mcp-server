import { z } from 'zod'
import { zendeskClient } from '../zendesk-client.js'

// Zendesk Chat tools for managing chat conversations and live chat data
export const chatTools = [
	{
		name: 'list_chats',
		description: 'List Zendesk Chat conversations',
		schema: {
			page: z.number().optional().describe('Page number for pagination'),
			per_page: z.number().optional().describe('Number of chats per page (max 100)')
		},
		handler: async ({ page, per_page }) => {
			try {
				const params = { page, per_page }
				const result = await zendeskClient.listChats(params)
				return {
					content: [{
						type: 'text',
						text: JSON.stringify(result, null, 2)
					}]
				}
			} catch (error) {
				return {
					content: [{ type: 'text', text: `Error listing chats: ${error.message}` }],
					isError: true
				}
			}
		}
	}
]
