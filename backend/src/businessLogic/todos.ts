import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'
//import { promises } from 'fs';

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todosAcess = new TodosAccess()

export async function createTodo(
  newTodo: CreateTodoRequest,
  userId:string
): Promise<TodoItem> {
  logger.info('Create todo function called') 
  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
    const s3Attachmenturl = attachmentUtils.getAttachmentUrl(todoId)
  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    attachmentUrl: s3Attachmenturl,
    ...newTodo
  }
  return await todosAcess.createTodoItem(newItem)
}