'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox = ({ icon: Icon, label, selected }:CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // Check for deselect
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true })

        router.push(url)
    }, [label, params, router])

  return (
    <div
        onClick={handleClick}
        className={`
            flex
            flex-col
            items-center
            justify-between
            p-3
            border-b-2
            hover:text-neutral-600
            transition
            cursor-pointer
            ${selected ? 'border-b-black' : 'border-b-transparent'}
            ${selected ? 'text-black' : 'text-neutral-400'}
        `}
    >
        <Icon size={26} />
        <div className="font-medium overflow-x-hidden text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox