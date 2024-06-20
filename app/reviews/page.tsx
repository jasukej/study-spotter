import React from 'react'
import getReviewsByUserId from '../actions/getReviewsByUserId'
import getCurrentUser from '../actions/getCurrentUser';
import NoSpotsView from '../components/NoSpotsView';
import Container from '../components/Container';
import Heading from '../components/Heading';
import useLoginModal from '../hooks/useLoginModal';
import ReviewCard from '../components/spotview/ReviewCard';

const ReviewsPage = async () => {
  const user = await getCurrentUser() || null;

  if (!user) return (
    <div>
      <NoSpotsView />
    </div>
  )

  const myReviews = await getReviewsByUserId(user.id)

  if (!myReviews) return (
    <div>
      <NoSpotsView />
    </div>
  )

  return (
    <div className="mt-8 px-4">
      <Container>
      <Heading
        title="My reviews"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-2
          lg:grid-cols-3
          gap-4
        ">
          {myReviews.map((review:any, index) => {
            return (
              <ReviewCard 
                key={index}
                review={review}
                user={user}
              />
            )})
          }
      </div>
    </Container>
    </div>
  )
}

export default ReviewsPage