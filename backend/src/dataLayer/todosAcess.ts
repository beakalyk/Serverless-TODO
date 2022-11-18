import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
export class TodosAccess{
    constructor(
        private readonly docClient: DocumentClient=new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly todosIndex = process.env.INDEX_NAME
    ){}
    async getAllTodos(userId:string):Promise<TodoItem[]>{
        logger.info('Get all Todos function Called')
        const result = await this.docClient
        .query({
            TableName:this.todosTable,
            IndexName:this.todosIndex,
            KeyConditionExpression:'userId = :userId',
            ExpressionAttributeValues:{
                ':userId':userId
            }

        })
        .promise()
        const item = result.Items
        return item as TodoItem[]
    }
    async createTodoItem(TodoItem:TodoItem):Promise<TodoItem>{
        logger.info('Creaet to item func called')
        const result = await this.docClient
        .put({
            TableName:this.todosTable,
            Item:TodoItem
        })
        .promise()
        logger.info('Todo item create',result)
        return TodoItem as TodoItem
    }
    async updateTodoItem(
        todoId:string,
        userId:string,
        TodoUpdate:TodoUpdate
    )

}