import { io } from 'socket.io-client'

const socket = io('https://text-drop-server.vercel.app/')

export default socket
