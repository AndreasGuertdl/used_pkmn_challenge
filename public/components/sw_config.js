/* if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("../service-worker.js")
            .then((registration) => {
                console.log("Register in scope: ", registration.scope);
                if(registration.active){
                    console.log("Service Worker active.");
                }
            })
            .catch((err) => {
                console.log("Register failed: ", err);
            });
            
    });
} */

//Unregister SW:
/* navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
        registration.unregister();
    }
}); */
