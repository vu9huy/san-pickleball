import CourtInfoWindow from "../courtInfoWindow/CourtInfoWindow";

const CourtsList = ({courts}) => {

    return(
        <>
            {courts?.map((court) => <CourtInfoWindow court={court} key={court.id} displayType={"listitem"} />)}
        </>
    )
}

export default CourtsList;