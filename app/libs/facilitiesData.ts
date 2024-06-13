import React, { useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { FaChalkboard, FaCoffee, FaRegLightbulb, FaWheelchair, FaWifi } from 'react-icons/fa';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiProjector2Fill } from 'react-icons/ri';
import { FaRestroom } from "react-icons/fa";
import { GrVend } from "react-icons/gr";
import { GrCafeteria } from "react-icons/gr";
import { MdMicrowave } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaTint } from 'react-icons/fa';
import { MdAccessTimeFilled } from "react-icons/md";
import { MdEmojiEvents } from "react-icons/md";

interface Facility {
    label: string;
    icon: React.ComponentType;
}

export const facilities = [
    {
        label: "Lecture rooms",
        icon: RiProjector2Fill
    },
    {
        label: "Private rooms available",
        icon: MdMeetingRoom
    },
    {
        label: "Wheelchair accessible",
        icon: FaWheelchair
    },
    {
        label: "Printer available",
        icon: AiFillPrinter
    },
    {
        label: "Vending machines",
        icon: GrVend
    },
    {
        label: "Microwave available",
        icon: MdMicrowave
    },
    {
        label: "Food outlets",
        icon: GrCafeteria
    },
    {
        label: "Coffee shop",
        icon: FaCoffee
    },
    {
        label: "Library/Book resources",
        icon: IoLibrary
    },
    {
        label: "Parking available",
        icon: FaParking
    },
    { 
        label: "Student lounges", 
        icon: MdAirlineSeatReclineNormal 
    },
    {
        label: "Event spaces",
        icon: MdEmojiEvents
    },
    {
        label: "After hours access",
        icon: MdAccessTimeFilled
    },
    {
        label: "Printer available",
        icon: AiFillPrinter
    },
];