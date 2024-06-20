import getBuildingById from "@/app/actions/getBuildingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getStudySpotById from "@/app/actions/getStudySpotById";
import Container from "@/app/components/Container";
import NoSpotsView from "@/app/components/NoSpotsView";
import FeaturesDisplay from "@/app/components/spotview/FeaturesDisplay";
import ImageGrid from "@/app/components/spotview/ImageGrid";
import InfoBox from "@/app/components/spotview/InfoBox";
import Image from "next/image";
import React from "react";
import { noiseLevels } from "@/app/libs/noiseData";
import { FaRegFlag } from "react-icons/fa6";
import { GeoJSONLocation } from "@/app/components/studyspots/SpotCard";
import { FaPeopleLine } from "react-icons/fa6";
import { FaVolumeLow } from "react-icons/fa6";
import OpenHoursDisplay from "@/app/components/spotview/OpenHoursDisplay";
import LocationDisplay from "@/app/components/spotview/LocationDisplay";
import Separator from "@/app/components/Separator";
import SpotReviews from "@/app/components/spotview/SpotReviews";
import getReviewsBySpotId from "@/app/actions/getReviewsBySpotId";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import SpotRecommendations from "@/app/components/spotview/SpotRecommendations";
import BookmarkButton from "@/app/components/BookmarkButton";

interface SpotPageParams {
  spotId?: string;
}

const SpotPage = async ({ params }: { params: SpotPageParams }) => {
  const spot = await getStudySpotById(params);
  const currentUser = await getCurrentUser();

  if (!spot) {
    return <NoSpotsView />;
  }

  const {
    name,
    imgSrc,
    category,
    id,
    description,
    location,
    features,
    noiseLevel,
    capacity,
    userId,
    buildingId,
    createdAt,
    openHours,
    address,
  } = spot;

  const reviews = await getReviewsBySpotId(id);

  let building = null;
  if (buildingId) {
    building = await getBuildingById(buildingId);
  }

  const noiseData = noiseLevels.find(
    ({ level, label, description }) => level == noiseLevel
  );

  const findAddress = () => {
    if (building?.address) {
      return building?.address;
    } else if (address) {
      return address
    }

    return undefined
  }

  const formattedLocation = {
    // @ts-ignore
    lat: parseFloat(location?.coordinates[1]),
    // @ts-ignore
    lng: parseFloat(location?.coordinates[0])
  }

  return (
    <Container>
      <div 
        className="
            absolute
            top-28
            left-12">
            <BackButton />
        </div>
      <div
        className="
            pt-14
            px-4
            flex
            flex-col
            gap-y-5
            xl:px-16
        "
      >
        <div
          className="
            md:min-h-[40vh]
            w-full
            "
        >
          <ImageGrid images={imgSrc} spotName={name} />
        </div>
        {/* HEADER */}
        <div className="px-[16px]">
          <div
            className="
                    flex 
                    flex-col 
                    gap-y-4 
                    lg:max-w-[60%]
                    mb-8
                    "
          >
            <div
              className="
                        flex 
                        md:flex-row 
                        flex-col 
                        gap-y-4 
                        justify-between"
            >
              <div className="flex flex-col gap-y-2">
                <div className="
                  flex 
                  flex-row
                  justify-between">
                  <div
                    className="
                                  text-4xl
                                  font-bold
                              "
                  >
                    {name}
                  </div>
                  <div className="mt-1 z-0">
                    <BookmarkButton
                      spotId={id}
                      large
                      currentUser={currentUser}
                    />
                  </div>
                </div>
                <div>
                  {building && (
                    <div
                      className="
                                    flex
                                    flex-row
                                    gap-x-1
                                    text-xl
                                text-neutral-500
                                "
                    >
                      <span>
                        {category} space in
                        <div
                          className="
                                            underline
                                            cursor-pointer
                                            inline
                                            ml-[5px]
                                            hover:text-neutral-900
                                            active:text-neutral-500
                                            underline-offset-2
                                        "
                        >
                          <Link href={`/building/${buildingId}`}>{building.name}</Link>
                        </div>
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="
                                    text-sm
                                "
                >
                  {description}
                </div>
                <div
                  className="
                                w-full
                                border-neutral-800
                                flex
                                pt-2
                                flex-col
                                justify-between
                                border-b-[1px]
                                "
                >
                  <InfoBox
                    value={capacity}
                    title="Capacity"
                    description="Estimated spot capacity"
                    icon={FaPeopleLine}
                  />
                  <InfoBox
                    value={noiseData ? noiseData.label : ""}
                    title="Noise Level"
                    description={noiseData ? noiseData.description : ""}
                    icon={FaVolumeLow}
                  />
                </div>
              </div>
              <div>
                {/* What do I put here? */}
                {/* Possibly busyLevel */}
              </div>
            </div>
            <Separator />
              {/* OPEN HOURS */}
              {(building || openHours) 
                && 
                  <div>
                    <OpenHoursDisplay openHours={building ? building?.openHours : openHours} /> 
                  </div>
              }
            {(building || openHours) && <Separator />}
            <div>
              {/* FEATURES AND FACILITIES */}
              <FeaturesDisplay featuresData={features} />
            </div>
            <Separator />
            <div>
              {/* FEATURES AND FACILITIES */}
              <LocationDisplay
                //@ts-ignore
                location={formattedLocation}
                address={findAddress()}
                name={building?.name}
              />
            </div>
          </div>
          <Separator />
          <div>
            <SpotReviews 
              spotId={id}
              reviews={reviews}
              currentUser={currentUser} 
            />
          </div>
          <Separator />
          <div>
              <SpotRecommendations 
                spotId={id}
              />
          </div>
          <div 
            className="
            justify-center 
            flex
            flex-row 
            items-center
            gap-x-2
            text-neutral-500
            hover:underline
            hover:underline-offset-2
            cursor-pointer">
            <FaRegFlag size={14}/> Report this study spot
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SpotPage;
