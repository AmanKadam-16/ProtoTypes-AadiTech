import { useState, useMemo, useCallback } from 'react'
import { ChevronDown, ChevronUp, Edit, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { locationDetails, LocationDetail } from './Data'

export default function LocationList() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof LocationDetail; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10

  const filteredLocations = useMemo(() => {
    return locationDetails.filter((location) =>
      Object.values(location).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm])

  const sortedLocations = useMemo(() => {
    let sortableItems = [...filteredLocations]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [sortConfig, filteredLocations])

  const paginatedLocations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedLocations.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, sortedLocations])

  const totalPages = Math.ceil(sortedLocations.length / itemsPerPage)

  const requestSort = useCallback((key: keyof LocationDetail) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }, [sortConfig])

  const handleEdit = useCallback((location: LocationDetail) => {
    console.log('Edit', location)
    // Implement edit functionality
  }, [])

  const handleDelete = useCallback((location: LocationDetail) => {
    console.log('Delete', location)
    // Implement delete functionality
  }, [])

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }, [])

  return (
    <div className="container mx-auto p-4">
      <code>{'>> Demo for responsive views List | Cards'}</code>
      <h1 className="text-2xl font-bold mb-4">Location Details</h1>
      
      {/* Search Input */}
      <div className="mb-4">
      {/* <Search className="h-4 w-4 text-gray-500" /> */}
        <Input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>

      {sortedLocations.length === 0 && (
        <p className="text-center text-gray-500 my-4">No location details available.</p>
      )}

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {locationDetails.length > 0 && Object.keys(locationDetails[0]).map((key) => (
                <TableHead key={key} className="cursor-pointer" onClick={() => requestSort(key as keyof LocationDetail)}>
                  {key}
                  {sortConfig?.key === key && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                  )}
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLocations.map((location, index) => (
              <TableRow key={index}>
                {Object.values(location).map((value, valueIndex) => (
                  <TableCell key={valueIndex}>{value}</TableCell>
                ))}
                <TableCell>
                  <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(location)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(location)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {paginatedLocations.map((location, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-primary p-4">
                <h2 className="text-2xl font-bold text-primary-foreground">{location.City}</h2>
                <p className="text-sm text-primary-foreground/80">{location.State}, {location.Country}</p>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">PIN:</span> {location.Pin}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Language:</span> {location.Language}
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(location)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(location)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

