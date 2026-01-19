import { IsString, MaxLength } from "class-validator";

export class CreateComment{
    @IsString()
    @MaxLength(1000, {message:'Text length is out from range[1-1000]'})
    text:string;
    
    @IsString()
    task_id:string;
    
}