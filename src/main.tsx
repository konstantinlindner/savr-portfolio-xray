import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/styles/globals.css'
import { App } from '@/app'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('No root element found')
}

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement)
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
}
