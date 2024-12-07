import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface LocationDetail {
  State: string
  City: string
  Country: string
  Pin: string
  Language: string
}

const locationDetails: LocationDetail[] = [
    {
      State: "California",
      City: "Los Angeles",
      Country: "USA",
      Pin: "90001",
      Language: "English"
    },
    {
      State: "Texas",
      City: "Houston",
      Country: "USA",
      Pin: "77001",
      Language: "English"
    },
    {
      State: "New York",
      City: "New York City",
      Country: "USA",
      Pin: "10001",
      Language: "English"
    },
    {
      State: "Queensland",
      City: "Brisbane",
      Country: "Australia",
      Pin: "4000",
      Language: "English"
    },
    {
      State: "Maharashtra",
      City: "Mumbai",
      Country: "India",
      Pin: "400001",
      Language: "Marathi"
    },
    {
      State: "Ontario",
      City: "Toronto",
      Country: "Canada",
      Pin: "M5H 2N2",
      Language: "English"
    },
    {
      State: "Beijing",
      City: "Beijing",
      Country: "China",
      Pin: "100000",
      Language: "Mandarin"
    },
    {
      State: "Île-de-France",
      City: "Paris",
      Country: "France",
      Pin: "75001",
      Language: "French"
    },
    {
      State: "Berlin",
      City: "Berlin",
      Country: "Germany",
      Pin: "10115",
      Language: "German"
    },
    {
      State: "Tokyo",
      City: "Tokyo",
      Country: "Japan",
      Pin: "100-0001",
      Language: "Japanese"
    },
    {
      State: "Rio de Janeiro",
      City: "Rio de Janeiro",
      Country: "Brazil",
      Pin: "20000-000",
      Language: "Portuguese"
    },
    {
      State: "England",
      City: "London",
      Country: "United Kingdom",
      Pin: "EC1A 1BB",
      Language: "English"
    },
    {
      State: "Gauteng",
      City: "Johannesburg",
      Country: "South Africa",
      Pin: "2000",
      Language: "Zulu"
    },
    {
      State: "Moscow",
      City: "Moscow",
      Country: "Russia",
      Pin: "101000",
      Language: "Russian"
    },
    {
      State: "Dubai",
      City: "Dubai",
      Country: "United Arab Emirates",
      Pin: "00000",
      Language: "Arabic"
    },
    {
      State: "New South Wales",
      City: "Sydney",
      Country: "Australia",
      Pin: "2000",
      Language: "English"
    },
    {
      State: "Tamil Nadu",
      City: "Chennai",
      Country: "India",
      Pin: "600001",
      Language: "Tamil"
    },
    {
      State: "Bavaria",
      City: "Munich",
      Country: "Germany",
      Pin: "80331",
      Language: "German"
    },
    {
      State: "Seoul",
      City: "Seoul",
      Country: "South Korea",
      Pin: "03000",
      Language: "Korean"
    },
    {
      State: "Lombardy",
      City: "Milan",
      Country: "Italy",
      Pin: "20100",
      Language: "Italian"
    },
    {
      State: "Bali",
      City: "Denpasar",
      Country: "Indonesia",
      Pin: "80232",
      Language: "Indonesian"
    },
    {
      State: "Buenos Aires",
      City: "Buenos Aires",
      Country: "Argentina",
      Pin: "C1000",
      Language: "Spanish"
    },
    {
      State: "Madrid",
      City: "Madrid",
      Country: "Spain",
      Pin: "28001",
      Language: "Spanish"
    },
    {
      State: "Istanbul",
      City: "Istanbul",
      Country: "Turkey",
      Pin: "34000",
      Language: "Turkish"
    },
    {
      State: "Bangkok",
      City: "Bangkok",
      Country: "Thailand",
      Pin: "10100",
      Language: "Thai"
    },
    {
      State: "Victoria",
      City: "Melbourne",
      Country: "Australia",
      Pin: "3000",
      Language: "English"
    },
    {
      State: "Quebec",
      City: "Montreal",
      Country: "Canada",
      Pin: "H3A 1E4",
      Language: "French"
    },
    {
      State: "West Bengal",
      City: "Kolkata",
      Country: "India",
      Pin: "700001",
      Language: "Bengali"
    },
    {
      State: "Texas",
      City: "Austin",
      Country: "USA",
      Pin: "73301",
      Language: "English"
    },
    {
      State: "Nevada",
      City: "Las Vegas",
      Country: "USA",
      Pin: "89101",
      Language: "English"
    }
  ];
  

export default function LocationList() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof LocationDetail; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const sortedLocations = useMemo(() => {
    let sortableItems = [...locationDetails]
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
  }, [sortConfig])

  const paginatedLocations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedLocations.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, sortedLocations])

  const totalPages = Math.ceil(locationDetails.length / itemsPerPage)

  const requestSort = (key: keyof LocationDetail) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const handleEdit = (location: LocationDetail) => {
    console.log('Edit', location)
    // Implement edit functionality
  }

  const handleDelete = (location: LocationDetail) => {
    console.log('Delete', location)
    // Implement delete functionality
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Location Details</h1>
      
      {locationDetails.length === 0 && (
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
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(location)}>
                    <Trash2 className="h-4 w-4" />
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

