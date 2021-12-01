export const sendFollowNotification = async (sender, receiver) => {
    const message = {
        to: receiver.data().expoPushToken,
        sound: "default",
        title: "New follower",
        body: sender.data().username + " is now following you",
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
};
