import type CapacitorPersistedStore from "$src/lib/-universis/authentication/storage/capacitorPersistedStore";
import { userCreds, userTokens } from "$src/lib/-universis/authentication/storage/credentials.store";
import { loginStore } from "$src/lib/-universis/authentication/loginStore";

const persistedStores: CapacitorPersistedStore<any>[] = [
    userCreds,
    userTokens,
    loginStore
    // Add new stores here
];

export async function loadPersistedStores() {
    console.log('Loading persisted stores');
    await Promise.all(persistedStores.map(store => store.loadFromStorage()));
}

export async function resetPersistedStores() {
    console.log('Resetting persisted stores');
    await Promise.all(persistedStores.map(store => store.reset()));
}