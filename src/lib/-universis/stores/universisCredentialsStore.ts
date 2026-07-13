import CapacitorPersistedStore from '$src/lib/-universis/authentication/storage/capacitorPersistedStore'

// Store for the user's credentials
export const userCreds = new CapacitorPersistedStore({
    username: "",
    password: "",
    token: ""
}, 'usercredentials')