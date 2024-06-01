import React, { useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { FaChalkboard, FaRegLightbulb, FaWheelchair, FaWifi } from 'react-icons/fa';
import { FaPlug } from 'react-icons/fa6';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiProjector2Fill } from 'react-icons/ri';

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
        label: "Printer available",
        icon: AiFillPrinter
    },
];

interface Feature {
  label: string;
  icon: React.ComponentType;
}