import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate';
//import { TodoUpdate } from '../models/TodoUpdate';
//import * as createError from 'http-errors'
//import { promises } from 'fs';

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todosAcess = new TodosAccess()

export async function getTodosForUser(userId:string): Promise<TodoItem[]>{
    logger.info('Get todo for user function called')
    return todosAcess.getAllTodos(userId)
}



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

export async function updateTodo(
     todoId: string,
     todoUpdate: UpdateTodoRequest,
     userId: string
): Promise<TodoUpdate> {
        logger.info('Update to do function called')
    return todosAcess.updateTodoItem(todoId, userId, todoUpdate)
    }

    export async function deleteTodo(
         todoId:string,
         userId :string
    ): Promise <string> {
        logger.info('Delete todo function called')
        return todosAcess.deleteTodoItem(todoId,userId)
    }


export async function createAttachmentPresignedUrl(
    todoId: string,
    userId: string
): Promise <string> {
    logger.info('Create attachemnt function called by user ', userId, todoId)
    return attachmentUtils.getUploadUrl(todoId)
}
