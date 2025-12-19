const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/api/routes';
const OUTPUT_FILE = path.join(__dirname, 'data.js');

async function syncData() {
    try {
        console.log(`Fetching data from ${API_URL}...`);
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch routes: ${response.statusText}`);
        }

        const routes = await response.json();
        console.log(`Fetched ${routes.length} routes.`);

        // Clean up data to match data.js format (remove MongoDB specific fields)
        const cleanedRoutes = routes.map(route => {
            const cleanRoute = { ...route };
            
            // Remove MongoDB metadata from route
            delete cleanRoute._id;
            delete cleanRoute.__v;
            delete cleanRoute.createdAt;
            delete cleanRoute.updatedAt;

            // Clean sections
            if (cleanRoute.sections) {
                cleanRoute.sections = cleanRoute.sections.map(s => {
                    const cleanSection = { ...s };
                    delete cleanSection._id;
                    return cleanSection;
                });
            }

            // Clean tracks
            if (cleanRoute.tracks) {
                cleanRoute.tracks = cleanRoute.tracks.map(t => {
                    const cleanTrack = { ...t };
                    delete cleanTrack._id;
                    
                    if (cleanTrack.fromConnection) delete cleanTrack.fromConnection._id;
                    if (cleanTrack.toConnection) delete cleanTrack.toConnection._id;
                    if (cleanTrack.altRoute) delete cleanTrack.altRoute._id;
                    
                    if (cleanTrack.shape) {
                        cleanTrack.shape = cleanTrack.shape.map(s => {
                            const cleanShape = { ...s };
                            delete cleanShape._id;
                            return cleanShape;
                        });
                    }
                    return cleanTrack;
                });
            }

            // Clean stations
            if (cleanRoute.stations) {
                cleanRoute.stations = cleanRoute.stations.map(s => {
                    const cleanStation = { ...s };
                    delete cleanStation._id;
                    if (cleanStation.platforms) {
                        cleanStation.platforms = cleanStation.platforms.map(p => {
                            const cleanPlatform = { ...p };
                            delete cleanPlatform._id;
                            return cleanPlatform;
                        });
                    }
                    return cleanStation;
                });
            }

            // Clean structures
            if (cleanRoute.structures) {
                cleanRoute.structures = cleanRoute.structures.map(s => {
                    const cleanStructure = { ...s };
                    delete cleanStructure._id;
                    if (cleanStructure.trackLocation) {
                        cleanStructure.trackLocation = cleanStructure.trackLocation.map(tl => {
                            const cleanTL = { ...tl };
                            delete cleanTL._id;
                            return cleanTL;
                        });
                    }
                    return cleanStructure;
                });
            }

            return cleanRoute;
        });

        const fileContent = `const routes = ${JSON.stringify(cleanedRoutes, null, 4)};\n`;

        fs.writeFileSync(OUTPUT_FILE, fileContent);
        console.log(`Successfully updated ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error syncing data:', error);
    }
}

syncData();
