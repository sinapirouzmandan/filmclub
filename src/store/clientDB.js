import {openDB} from "idb";
    async function connectToDB() {
        try {
            return openDB('movieDB', 2, {
                upgrade(db) {
                    if (!(db.objectStoreNames.contains('watchList'))) {
                        db.createObjectStore('watchList')
                    }
                    if (!(db.objectStoreNames.contains('user'))) {
                        db.createObjectStore('user')
                    }
                    if (!(db.objectStoreNames.contains('myPosts'))) {
                        db.createObjectStore('myPosts')
                    }
                }
            });
        }
        catch (e){
            console.log(e)
        }
    }
    export async function putWatchList(post) {
        try {
            let db = await connectToDB()
            let tx = db.transaction(['watchList'], 'readwrite')
            let store = tx.objectStore('watchList')

            await store.put(post, 0)
            db.close()
        }
        catch (e){
            console.log(e)
        }
    }

    export async function getWatchList() {
        try {
            let db = await connectToDB()
            let tx = db.transaction(['watchList'], 'readwrite')
            let store = tx.objectStore('watchList')
            let post = []
            await store.getAll().then((posts) => {
                post = posts[0]
            });
            db.close()
            return post
        }
        catch (e){
            console.log(e)
        }
    }

    export async function putUserInfo(user) {
        try {
            let db = await connectToDB()
            let tx = db.transaction('user', 'readwrite')
            let store = tx.objectStore('user')

            await store.put(user, 0)
            db.close()
        }
        catch (e){
            console.log(e)
        }
    }

    export async function getUser() {
        try {
            let db = await connectToDB()
            let tx = db.transaction(['user'], 'readonly')
            let store = tx.objectStore('user')
            let user = {}
            await store.getAll().then((data) => {
                user = data[0]
            });
            db.close()
            return user
        }
        catch (e){
            console.log(e)
        }
    }

    export async function putUserPosts(posts) {
        try {
            let db = await connectToDB()
            let tx = db.transaction('myPosts', 'readwrite')
            let store = tx.objectStore('myPosts')

            await store.put(posts, 0)
            db.close()
        }
        catch (e){
            console.log(e)
        }
    }

    export async function getUserPosts() {
        try {
            let db = await connectToDB()
            let tx = db.transaction(['myPosts'], 'readonly')
            let store = tx.objectStore('myPosts')
            let posts = {}
            await store.getAll().then((data) => {
                posts = data[0]
            });
            db.close()
            return posts
        }
        catch (e){
            console.log(e)
        }
    }