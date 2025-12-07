// src/components/SavedOpportunity.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Button } from './ui/button';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

interface SavedOpportunityProps {
  bookmark: {
    id: string;
    type: string;
    refId: string;
  };
}

const SavedOpportunity: React.FC<SavedOpportunityProps> = ({ bookmark }) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (bookmark.type !== 'business') {
        setLoading(false);
        return;
      }
      try {
        const itemDoc = await getDoc(doc(db, 'businesses', bookmark.refId));
        if (itemDoc.exists()) {
          setItem({ id: itemDoc.id, ...itemDoc.data() });
        }
      } catch (error) {
        console.error("Error fetching saved item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [bookmark]);

  if (loading) {
    return (
        <div className="p-3 border-b last:border-b-0 flex justify-between items-center">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-[70px]" />
        </div>
    );
  }

  if (!item) {
     return (
        <div className="p-3 border-b last:border-b-0 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Could not load opportunity: {bookmark.refId}</p>
        </div>
     )
  }

  return (
    <div className="p-3 border-b last:border-b-0 flex justify-between items-center hover:bg-muted/50 transition-colors">
      <div>
        <Link href={`/proposals?businessId=${item.id}`} className="font-medium hover:underline">{item.name}</Link>
        <p className="text-xs text-muted-foreground uppercase">{bookmark.type}</p>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/proposals?businessId=${item.id}`}>View</Link>
      </Button>
    </div>
  );
};

export default SavedOpportunity;
