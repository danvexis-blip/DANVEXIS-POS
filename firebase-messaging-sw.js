importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:"AIzaSyB7VnK4N_Fo2JhCNcYL-UY9gyqhezXI0-8",
  authDomain:"danvexis-3a1e0.firebaseapp.com",
  projectId:"danvexis-3a1e0",
  storageBucket:"danvexis-3a1e0.firebasestorage.app",
  messagingSenderId:"1083975479921",
  appId:"1:1083975479921:web:3a67e7b171f2652def61d0",
  measurementId:"G-EWJPTVB38Y"
});

const messaging=firebase.messaging();

messaging.onBackgroundMessage(payload=>{
  const n=payload.notification||{};
  const d=payload.data||{};
  const title=n.title||"DANVEXIS — New Order";
  const body=n.body||((d.customerName||"Customer")+" · LKR "+(d.total||"0"));
  self.registration.showNotification(title,{
    body,
    icon:"./icon-192.png",
    badge:"./icon-192.png",
    tag:d.orderId?("danvexis-order-"+d.orderId):"danvexis-order",
    data:{url:"./"}
  });
});

self.addEventListener("notificationclick",event=>{
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
      for(const client of list){
        if(client.url.includes("/DANVEXIS-POS/") && "focus" in client) return client.focus();
      }
      if(clients.openWindow) return clients.openWindow("./");
    })
  );
});
