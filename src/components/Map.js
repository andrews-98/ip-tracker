import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';


export const Map = ({ position }) => {

    const FlyTo = () => {
        const map = useMap()

        useEffect(() => {
            map.flyTo(position)
        }, [position])

        return null
    }


    return <>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '70vh' }}>
            <FlyTo />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Marker
                </Popup>
            </Marker>
        </MapContainer>
    </>
}
