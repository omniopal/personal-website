const consoleImageDimensions: Record<string, number> = {
    'Nintendo Entertainment System': 100,
    'Game Boy': 120,
    'Super Nintendo Entertainment System': 140,
    'Virtual Boy': 120,
    'Nintendo 64': 140,
    'Game Boy Color': 120,
    'Game Boy Advance': 120,
    'GameCube': 100,
    'Nintendo DS': 120,
    'Wii': 100,
    'Nintendo 3DS': 120,
    'WiiU': 100,
    'Switch': 100,
}

export const getConsoleImageDimensions = (consoleName: string): number => {
    return consoleImageDimensions[consoleName];
}