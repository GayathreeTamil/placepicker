export async function fetchAvailablePlaces(){
    const res = await fetch('http://localhost:3000/places')
    const resData = await res.json()
    if (!res.ok){
        throw new Error("Failed to fetch Places")
    }
    return resData.places
}

export async function fetchUserPlaces(){
    const res = await fetch('http://localhost:3000/user-places')
    const resData = await res.json()
    if (!res.ok){
        throw new Error("Failed to fetch User's Places")
    }
    return resData.places
}

export async function updateUserPlaces(places){
    const res = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resData =  await res.json()
    if (!res.ok){
        throw new Error('Failed to update user Data');
    }
    return resData.message
}































