import Image from "next/image";
import Container from "./components/Container";
import NoSpotsView from "./components/NoSpotsView";
import getStudySpots from "./actions/getStudySpots";
import SpotCard from "./components/studyspots/SpotCard";
import getCurrentUser from "./actions/getCurrentUser";
import { ISpotsParams } from "./actions/getStudySpots";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface HomeProps {
  searchParams: ISpotsParams;
}

export default async function Home({ searchParams }:HomeProps) {
  const spots = await getStudySpots(searchParams);
  const currentUser = await getCurrentUser() || undefined;

  if (spots.length == 0) {
    return (
      <NoSpotsView />
    )
  }

  return (
    <Container>
      <div
      className="
        pt-24
        px-2
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-8
        mx-2
      ">
          {spots.map((spot:any) => {
            return (
              <SpotCard
                currentUser={currentUser}
                key={spot.id}
                data={spot}
              />
            )
          })}
      </div>
    </Container>
  );
}
