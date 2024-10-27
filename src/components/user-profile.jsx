'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { toast } from '@/hooks/use-toast'
import { FileDown, Trash2, Eye } from 'lucide-react'

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePic: '/placeholder.svg?height=100&width=100',
}

// Mock activity log data
const initialActivityLog = [
  { id: 1, service: 'Marketing Text Generator', date: '2023-05-01', content: 'Generated marketing text for Product X' },
  { id: 2, service: 'Grammar Check', date: '2023-05-03', content: 'Checked grammar for essay on climate change' },
  { id: 3, service: "I'rab Sentence Parsing", date: '2023-05-05', content: 'Parsed Arabic sentence: الْعِلْمُ نُورٌ' },
]

export default function UserProfile() {
  const [activityLog, setActivityLog] = useState(initialActivityLog)
  const [selectedActivity, setSelectedActivity] = useState(null)

  const handleDownload = (id) => {
    // Placeholder for download functionality
    toast({
      title: "Download Started",
      description: `Downloading activity ${id} as PDF.`,
    })
  }

  const handleDelete = (id) => {
    setActivityLog(activityLog.filter(activity => activity.id !== id))
    toast({
      title: "Activity Deleted",
      description: `Activity ${id} has been removed from your log.`,
    })
  }

  return (
    (<div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#20b1c9]">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profilePic} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#20b1c9]">Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.service}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedActivity(activity)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>{selectedActivity?.service}</SheetTitle>
                            <SheetDescription>{selectedActivity?.date}</SheetDescription>
                          </SheetHeader>
                          <div className="mt-4">
                            <p>{selectedActivity?.content}</p>
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button variant="outline" size="icon" onClick={() => handleDownload(activity.id)}>
                        <FileDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(activity.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>)
  );
}