const mongoose = require('mongoose')

const UserModel = require('../models/user.model')
const FileModel = require('../models/file.model')

const mockUser = { name: 'test', email: 'test@test.com', password: '123456789' }
const mockNotes = [
  {
    category: 'testCategory1',
    title: 'testTitle1',
    content: 'A simple test1.',
    date: Date.now(),
    fileName: 'file1'
  },
  {
    category: 'testCategory2',
    title: 'testTitle2',
    content: 'A simple test2.',
    date: Date.now(),
    fileName: 'file2'
  }
]
const mockFile = {
  noteId: null,
  dataUri: 'data:audio/mp3;base64,SUQzAwAAAAATBVRBTEIAAAAZAAAB'
}

describe('Save to Database', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  })

  afterAll(() => mongoose.disconnect())

  it('should create and save a user', async () => {
    const savedUser = await new UserModel({
      ...mockUser,
      notes: mockNotes
    }).save()
    const { notes: savedNotes } = savedUser

    expect(savedUser).toEqual(expect.objectContaining(mockUser))

    for (const note of savedNotes) {
      expect(note).toEqual(
        expect.objectContaining(mockNotes[savedNotes.indexOf(note)])
      )
    }

    mockFile.noteId = savedNotes[0]._id
  })

  it('should create and save a file', async () => {
    const savedFile = await new FileModel(mockFile).save()

    expect(savedFile).toEqual(expect.objectContaining(mockFile))
  })
})
