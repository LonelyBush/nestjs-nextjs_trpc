'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TodoItem } from '@/components/todo-item'
import { trpc } from '@/lib/trpc'

export default function Home() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const utils = trpc.useUtils()
  const todosQuery = trpc.todo.findAll.useQuery()
  const createMutation = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.findAll.invalidate()
      setTitle('')
      setDescription('')
    },
  })
  const updateMutation = trpc.todo.update.useMutation({
    onSuccess: () => utils.todo.findAll.invalidate(),
  })
  const deleteMutation = trpc.todo.delete.useMutation({
    onSuccess: () => utils.todo.findAll.invalidate(),
  })

  const handleCreate = () => {
    if (!title.trim()) return
    createMutation.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
    })
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Todo App</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <Button
              onClick={handleCreate}
              disabled={!title.trim() || createMutation.isPending}
            >
              {createMutation.isPending ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {todosQuery.isLoading && (
        <p className="text-muted-foreground">Loading...</p>
      )}
      {todosQuery.error && (
        <p className="text-destructive">Error: {todosQuery.error.message}</p>
      )}

      <div className="flex flex-col gap-3">
        {todosQuery.data?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={(data) =>
              updateMutation.mutate({ id: todo.id, data })
            }
            onDelete={() => deleteMutation.mutate({ id: todo.id })}
            isUpdating={updateMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />
        ))}
      </div>

      {todosQuery.data?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No todos yet. Add one above!
        </p>
      )}
    </main>
  )
}
