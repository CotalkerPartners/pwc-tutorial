declare type tomarCasoResponse = {
  nro_casos_disponibles: number
  nro_casos_asignados: number
  usuario: {
    name: string
    _id: ObjectId
  }
  error?: boolean
  assignment?: {
    url: string
    name: string
  },
  WEB_BASE_URL?: string
  isAssigning?: boolean
}

interface EjecutivoAnilloList {
  id: number
  display: string
  status: UserStatus
  email: string
  avatarUrl: string
}

interface UserStatus {
  id: number
  display: 'Online' | 'Desconectado' | 'Ocupado'
  lastOnline?: string
}