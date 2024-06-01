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

import { FaPeopleLine } from "react-icons/fa6";
import { FaVolumeLow } from "react-icons/fa6";
import OpenHoursDisplay from "@/app/components/spotview/OpenHoursDisplay";
import LocationDisplay from "@/app/components/spotview/LocationDisplay";
import Separator from "@/app/components/Separator";
import SpotReviews from "@/app/components/spotview/SpotReviews";
import getReviewsBySpotId from "@/app/actions/getReviewsBySpotId";

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
  } = spot;

  const reviews = await getReviewsBySpotId(id);

  let building = null;
  if (buildingId) {
    building = await getBuildingById(buildingId);
  }

  const noiseData = noiseLevels.find(
    ({ level, label, description }) => level == noiseLevel
  );

  return (
    <Container>
      <div
        className="
            py-4
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
                <div
                  className="
                                text-4xl
                                font-bold
                            "
                >
                  {name}
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
                        <span
                          className="
                                            hover:underline
                                            cursor-pointer
                                            inline
                                            ml-[5px]
                                            hover:text-neutral-900
                                        "
                        >
                          {building.name}
                        </span>
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
            <div>
              {/* OPEN HOURS */}
              {building && <OpenHoursDisplay openHours={building?.openHours} />}
            </div>
            <Separator />
            <div>
              {/* FEATURES AND FACILITIES */}
              <FeaturesDisplay featuresData={features} />
            </div>
            <Separator />
            <div>
              {/* FEATURES AND FACILITIES */}
              <LocationDisplay
                //@ts-ignore
                location={location}
                address={building?.address}
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
        </div>
      </div>
    </Container>
  );
};

export default SpotPage;
