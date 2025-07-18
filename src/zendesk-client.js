import axios from 'axios'

/**
 * Centralized Zendesk API client with authentication and request handling
 * Provides methods for all major Zendesk API endpoints across Support, Talk, Chat, and Guide
 */
class ZendeskClient {
	constructor () {
		// Load Zendesk credentials from environment variables
		this.subdomain = process.env.ZENDESK_SUBDOMAIN
		this.email = process.env.ZENDESK_EMAIL
		this.apiToken = process.env.ZENDESK_API_TOKEN

		// Warn if credentials are missing (but allow instantiation for testing)
		if (!this.subdomain || !this.email || !this.apiToken) {
			console.warn('Zendesk credentials not found in environment variables. Please set ZENDESK_SUBDOMAIN, ZENDESK_EMAIL, and ZENDESK_API_TOKEN.')
		}
	}

	// Construct the base URL for Zendesk API v2 endpoints
	getBaseUrl () {
		return `https://${this.subdomain}.zendesk.com/api/v2`
	}

	// Generate Basic Authentication header using email/token format
	getAuthHeader () {
		const auth = Buffer.from(`${this.email}/token:${this.apiToken}`).toString('base64')
		return `Basic ${auth}`
	}

	/**
	 * Core HTTP request method with authentication and error handling
	 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
	 * @param {string} endpoint - API endpoint path (e.g., '/tickets.json')
	 * @param {Object} data - Request body data for POST/PUT requests
	 * @param {Object} params - URL query parameters
	 * @returns {Object} Response data from Zendesk API
	 */
	async request (method, endpoint, data = null, params = null) {
		try {
			// Validate credentials before making requests
			if (!this.subdomain || !this.email || !this.apiToken) {
				throw new Error('Zendesk credentials not configured. Please set environment variables.')
			}

			const url = `${this.getBaseUrl()}${endpoint}`
			const headers = {
				Authorization: this.getAuthHeader(),
				'Content-Type': 'application/json'
			}

			const response = await axios({
				method,
				url,
				headers,
				data,
				params
			})

			return response.data
		} catch (error) {
			// Provide detailed error messages for API failures
			if (error.response) {
				throw new Error(`Zendesk API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`)
			}
			throw error
		}
	}

	// === TICKETS API ===
	async listTickets (params) {
		return this.request('GET', '/tickets.json', null, params)
	}

	async getTicket (id) {
		return this.request('GET', `/tickets/${id}.json`)
	}

	async createTicket (data) {
		return this.request('POST', '/tickets.json', { ticket: data })
	}

	async updateTicket (id, data) {
		return this.request('PUT', `/tickets/${id}.json`, { ticket: data })
	}

	async deleteTicket (id) {
		return this.request('DELETE', `/tickets/${id}.json`)
	}

	// === USERS API ===
	async listUsers (params) {
		return this.request('GET', '/users.json', null, params)
	}

	async getUser (id) {
		return this.request('GET', `/users/${id}.json`)
	}

	async createUser (data) {
		return this.request('POST', '/users.json', { user: data })
	}

	async updateUser (id, data) {
		return this.request('PUT', `/users/${id}.json`, { user: data })
	}

	async deleteUser (id) {
		return this.request('DELETE', `/users/${id}.json`)
	}

	// === ORGANIZATIONS API ===
	async listOrganizations (params) {
		return this.request('GET', '/organizations.json', null, params)
	}

	async getOrganization (id) {
		return this.request('GET', `/organizations/${id}.json`)
	}

	async createOrganization (data) {
		return this.request('POST', '/organizations.json', { organization: data })
	}

	async updateOrganization (id, data) {
		return this.request('PUT', `/organizations/${id}.json`, { organization: data })
	}

	async deleteOrganization (id) {
		return this.request('DELETE', `/organizations/${id}.json`)
	}

	// === GROUPS API ===
	async listGroups (params) {
		return this.request('GET', '/groups.json', null, params)
	}

	async getGroup (id) {
		return this.request('GET', `/groups/${id}.json`)
	}

	async createGroup (data) {
		return this.request('POST', '/groups.json', { group: data })
	}

	async updateGroup (id, data) {
		return this.request('PUT', `/groups/${id}.json`, { group: data })
	}

	async deleteGroup (id) {
		return this.request('DELETE', `/groups/${id}.json`)
	}

	// === MACROS API ===
	async listMacros (params) {
		return this.request('GET', '/macros.json', null, params)
	}

	async getMacro (id) {
		return this.request('GET', `/macros/${id}.json`)
	}

	async createMacro (data) {
		return this.request('POST', '/macros.json', { macro: data })
	}

	async updateMacro (id, data) {
		return this.request('PUT', `/macros/${id}.json`, { macro: data })
	}

	async deleteMacro (id) {
		return this.request('DELETE', `/macros/${id}.json`)
	}

	// === VIEWS API ===
	async listViews (params) {
		return this.request('GET', '/views.json', null, params)
	}

	async getView (id) {
		return this.request('GET', `/views/${id}.json`)
	}

	async createView (data) {
		return this.request('POST', '/views.json', { view: data })
	}

	async updateView (id, data) {
		return this.request('PUT', `/views/${id}.json`, { view: data })
	}

	async deleteView (id) {
		return this.request('DELETE', `/views/${id}.json`)
	}

	// === TRIGGERS API ===
	async listTriggers (params) {
		return this.request('GET', '/triggers.json', null, params)
	}

	async getTrigger (id) {
		return this.request('GET', `/triggers/${id}.json`)
	}

	async createTrigger (data) {
		return this.request('POST', '/triggers.json', { trigger: data })
	}

	async updateTrigger (id, data) {
		return this.request('PUT', `/triggers/${id}.json`, { trigger: data })
	}

	async deleteTrigger (id) {
		return this.request('DELETE', `/triggers/${id}.json`)
	}

	// === AUTOMATIONS API ===
	async listAutomations (params) {
		return this.request('GET', '/automations.json', null, params)
	}

	async getAutomation (id) {
		return this.request('GET', `/automations/${id}.json`)
	}

	async createAutomation (data) {
		return this.request('POST', '/automations.json', { automation: data })
	}

	async updateAutomation (id, data) {
		return this.request('PUT', `/automations/${id}.json`, { automation: data })
	}

	async deleteAutomation (id) {
		return this.request('DELETE', `/automations/${id}.json`)
	}

	// === SEARCH API ===
	async search (query, params = {}) {
		return this.request('GET', '/search.json', null, { query, ...params })
	}

	// === HELP CENTER API ===
	async listArticles (params) {
		return this.request('GET', '/help_center/articles.json', null, params)
	}

	async getArticle (id) {
		return this.request('GET', `/help_center/articles/${id}.json`)
	}

	async createArticle (data, sectionId) {
		return this.request('POST', `/help_center/sections/${sectionId}/articles.json`, { article: data })
	}

	async updateArticle (id, data) {
		return this.request('PUT', `/help_center/articles/${id}.json`, { article: data })
	}

	async deleteArticle (id) {
		return this.request('DELETE', `/help_center/articles/${id}.json`)
	}

	// === TALK API ===
	async getTalkStats () {
		return this.request('GET', '/channels/voice/stats.json')
	}

	// === CHAT API ===
	async listChats (params) {
		return this.request('GET', '/chats.json', null, params)
	}
}

// Export singleton instance for use across the application
export const zendeskClient = new ZendeskClient()
