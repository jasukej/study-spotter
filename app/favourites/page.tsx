import React from 'react'
import getFavouriteSpots from '../actions/getFavouriteSpots';
import getCurrentUser from '../actions/getCurrentUser';
import NoSpotsView from '../components/NoSpotsView';
import Container from '../components/Container';
import Heading from '../components/Heading';
import SpotCard from '../components/studyspots/SpotCard';

const FavouritesPage = async () => {
  const favouriteSpots = await getFavouriteSpots();
  const currentUser = await getCurrentUser() || undefined;

  if (favouriteSpots.length == 0) {
    return (
      <NoSpotsView />
    )
  }

  if (!favouriteSpots || !currentUser) {
    return (
      <div>
          Error page 404
      </div>
    )
  }

  return (
    <div className="mt-8">
    <Container>
      <Heading 
        title="Favourites"
        subtitle="Your favourite study spots"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {favouriteSpots.map((spot:any) => {
            return (
              <SpotCard 
                data={spot}
                currentUser={currentUser}
                key={spot.id}
              />
            )})
          }
      </div>
    </Container>
    </div>
  )
}

export default FavouritesPage