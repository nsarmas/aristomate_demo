import CapacitorPersistedStore from '$src/lib/-universis/authentication/storage/capacitorPersistedStore';

export type LoginTokens = {
    access_token: string;
    id_token: string;
    refresh_token: string;
    expires_at: string;
};

export type LoginStoreItem = keyof LoginTokens;

// Store for the user's login tokens

export const loginStore = new CapacitorPersistedStore<LoginTokens>({
    access_token: "",
    id_token: "",
    refresh_token: "",
    expires_at: ""
}, 'loginStore'
);
