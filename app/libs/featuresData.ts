import React, { useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { FaChalkboard, FaRegLightbulb, FaTint, FaWheelchair, FaWifi } from 'react-icons/fa';
import { FaPlug, FaRestroom } from 'react-icons/fa6';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiProjector2Fill } from 'react-icons/ri';
import { FaComputer } from "react-icons/fa6";

export const features = [
    {
        label: "Lots of working plugs",
        icon: FaPlug
    },
    {
        label: "Good lighting",
        icon: FaRegLightbulb
    },
    {
        label: "Comfortable seating",
        icon: MdAirlineSeatReclineNormal
    },
    {
        label: "Projector available",
        icon: RiProjector2Fill
    },
    {
        label: "Whiteboard available",
        icon: FaChalkboard
    },
    {
        label: "High-speed WiFi",
        icon: FaWifi
    },
    {
        label: "Wheelchair accessible",
        icon: FaWheelchair
    },
    {
        label: "Accessible water dispensers",
        icon: FaTint
    },
    {
        label: "Computers available",
        icon: FaComputer
    },
    {
        label: "Accessible restroom facilities",
        icon: FaRestroom
    },
];

interface Feature {
  label: string;
  icon: React.ComponentType;
}