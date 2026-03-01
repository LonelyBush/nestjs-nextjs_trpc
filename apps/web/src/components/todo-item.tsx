'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

interface Todo {
  id: string
  title: string
  description?: string | null
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onUpdate: (data: { title?: string; description?: string; completed?: boolean }) => void
  onDelete: () => void
  isUpdating: boolean
  isDeleting: boolean
}

export function TodoItem({ todo, onUpdate, onDelete, isUpdating, isDeleting }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description ?? '')

  const handleSave = () => {
    onUpdate({
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description ?? '')
    setIsEditing(false)
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <Checkbox
          checked={todo.completed}
          disabled={isEditing}
          onCheckedChange={(checked) =>
            onUpdate({ completed: Boolean(checked) })
          }
        />
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <Input
                placeholder="Description (optional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>
          ) : (
            <>
              <p
                className={`font-medium ${todo.completed ? 'text-muted-foreground line-through' : ''}`}
              >
                {todo.title}
              </p>
              {todo.description && (
                <p className="text-sm text-muted-foreground">
                  {todo.description}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!editTitle.trim() || isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting || isEditing}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
