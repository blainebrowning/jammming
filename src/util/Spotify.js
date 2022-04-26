let accessToken;
const client_id = 'e26a41f68bf04448b7014066ad55c2ff';
//const redirectUrl = "http://isolator-jammming.surge.sh";
const redirectUrl = "http://localhost:3000";


const Spotify = {

    getAccessToken() {
        
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access token', null, '/');
            return accessToken;
        } 
        
        const newUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}/`;
        window.location = newUrl;
    },

    search(searchTerm, podcastToggle) {

        let searchType;
        let objectProp;
        
        if (podcastToggle) {
            searchType = 'episode';
            objectProp = 'episodes';
        } else {
            searchType = 'track';
            objectProp = 'tracks';
        }
        
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=${searchType}&q=${searchTerm}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse[objectProp]) {
                return [];
            };
            
            if (podcastToggle) {
                return jsonResponse[objectProp].items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: <img src={track.images[0].url} width="30" height = "30" />, 
                    album: "Podcast",
                    uri: track.uri
                }));
            } else {
                return jsonResponse[objectProp].items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }

            
        });

    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        
        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
        .then(response => {
            return response.json()
        }).then(jsonResponse => {
            userId = jsonResponse.id;
            console.log(userId);
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            })
            .then(response => {
                return response.json()
            }).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                })

            })
        });

   } 
}

export default Spotify;