import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordHistory } from '@/lib/history'

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
    include: { sessions: { take: 10 } },
  })
  return NextResponse.json({ data: courses })
}

export async function POST(request: Request) {
  const payload = await request.json()
  const course = await prisma.course.create({
    data: {
      courseNumber: payload.courseNumber ?? `COURSE-${Date.now()}`,
      title: payload.title,
      durationHours: payload.durationHours ?? 0,
      grossPrice: payload.grossPrice ?? 0,
      taxRate: payload.taxRate ?? 20,
      netPrice:
        Number(payload.grossPrice ?? 0) -
        ((Number(payload.taxRate ?? 0) / 100) * Number(payload.grossPrice ?? 0)),
      category: payload.category ?? 'OTHER',
      description: payload.description,
    },
  })

  await recordHistory({
    module: 'Course',
    recordId: course.id,
    action: 'CREATED',
    changes: course,
  })

  return NextResponse.json({ data: course })
}
