import '../App.scss';

export const LocalizationBox = ({ locationDetails }) => {
    return (
        <div className='map-details'>
            <div className='map-details__item'>
                <h3>Ip Address</h3>
                <h2>{locationDetails?.ip || '-'}</h2>
            </div>
            <div className='map-details__item'>
                <h3>Location</h3>
                <h2>{locationDetails?.location ? `${locationDetails.location.city}, ${locationDetails.location.region}` : '-'}</h2>
            </div>
            <div className='map-details__item'>
                <h3>Timezone</h3>
                <h2>{locationDetails?.location ? `UTC${locationDetails.location.timezone}` : '-'}</h2>
            </div>
            <div className='map-details__item'>
                <h3>Isp</h3>
                <h2>{locationDetails?.isp || '-'}</h2>
            </div>
        </div>
    )
}