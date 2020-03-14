const reactLibPromise = new Promise(resolve => {
    const intervalId = setInterval(() => {
        if(!window.appReact) {
            return;
        }

        clearInterval(intervalId);
        resolve(window.appReact)
    })
})

export function getReactLib() {
    return reactLibPromise;
}