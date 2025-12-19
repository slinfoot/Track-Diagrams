const API_BASE = 'http://localhost:3000/api/routes/code/ECML';

async function undoYork() {
    try {
        // 1. Revert Track 3606
        const track3606Id = '6943d748d7d7c2451841ea88';
        const track3606Update = {
            shape: [{ from: 33, to: 461, yFrom: 49, yTo: 49 }],
            toConnection: {
                type: 'junction',
                at: 461,
                track: 3104,
                sc_name: '5052'
            }
        };
        
        console.log('Reverting Track 3606...');
        const res1 = await fetch(`${API_BASE}/tracks/by-id/${track3606Id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(track3606Update)
        });
        if (!res1.ok) throw new Error(`Failed to revert Track 3606: ${res1.statusText}`);
        console.log('Track 3606 reverted.');

        // 2. Revert Track 3104
        const track3104Id = '6943d748d7d7c2451841eaba';
        const track3104Update = {
            shape: [{ from: 461, to: 1664, yFrom: 49, yTo: 49 }]
        };

        console.log('Reverting Track 3104...');
        const res2 = await fetch(`${API_BASE}/tracks/by-id/${track3104Id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(track3104Update)
        });
        if (!res2.ok) throw new Error(`Failed to revert Track 3104: ${res2.statusText}`);
        console.log('Track 3104 reverted.');

        // 3. Revert Platform 6
        const stationId = '6943d748d7d7c2451841ec90'; // York Station ID
        console.log('Fetching route to get station data...');
        const resRoute = await fetch(`${API_BASE}`);
        if (!resRoute.ok) throw new Error(`Failed to fetch route: ${resRoute.statusText}`);
        const route = await resRoute.json();
        
        const station = route.stations.find(s => s._id === stationId);
        if (!station) throw new Error('York Station not found in route');

        const plat6Index = station.platforms.findIndex(p => p.platformNo === 6);
        if (plat6Index === -1) throw new Error('Platform 6 not found in station data');

        station.platforms[plat6Index].from = 331474;
        station.platforms[plat6Index].to = 331474;

        console.log('Reverting York Station Platform 6...');
        const res3 = await fetch(`${API_BASE}/stations/${stationId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(station)
        });
        if (!res3.ok) throw new Error(`Failed to revert York Station: ${res3.statusText}`);
        console.log('York Station reverted.');

    } catch (error) {
        console.error('Error:', error);
    }
}

undoYork();
