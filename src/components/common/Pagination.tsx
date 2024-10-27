import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card'
import TooltipElement from '@/components/common/TooltipElement'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  className?: string
}

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, className }: PaginationProps) {
  return (
    <Card className='text-center bg-white py-2 border-t border-gray-200 rounded-lg shadow-md w-[75%] m-2 mx-auto'>
      <div className={`p-4 flex justify-between items-center ${className}`}>
        <TooltipElement title="Anterior" delayDuration={300}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            data-cy="prev-page"
            className='disabled:cursor-not-allowed'
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </TooltipElement>
        <UIPagination>
          <PaginationContent>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(i + 1);
                  }}
                  data-cy={`page-${i + 1}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )).slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))}
          </PaginationContent>
        </UIPagination>

        <TooltipElement title="Próxima" delayDuration={300}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            data-cy="next-page"
            className='disabled:cursor-not-allowed'
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </TooltipElement>
      </div>
      <p className="text-sm font-medium flex-col items-center inline-block">
        <span>Página {currentPage} de {totalPages}</span>
        <small> ({totalItems} itens)</small>
      </p>
    </Card>
  )
}