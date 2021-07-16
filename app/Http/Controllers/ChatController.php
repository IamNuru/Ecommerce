<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    /* public function __construct()
    {
        $this->middleware('auth');
    } */


    // get Authenticated user object with other relationships
    public function getAuthUserChatWith($from_id, $to_id)
    {
        $messages = Message::where([['from_id', $from_id], ['to_id', $to_id]])
            ->orWhere([['from_id', $to_id], ['to_id', $from_id]])
            ->get();

        return response()->json($messages);
    }


    // send/store message
    public function sendNewMessage(Request $request, $from_id, $to_id)
    {
        $request->validate([
            'message' => 'required',
        ]);
        $user = Auth::user();


        $message = new Message;
        $message->from_id = $from_id;
        $message->to_id = $to_id;
        $message->message = $request->message;
        $message->save();
        broadcast(new MessageSent($message))->toOthers();
        return ['status' => 'Message Sent!'];
    }

    // store message from user
    public function sendUserNewMessage(Request $request, $from_id, $to_id)
    {
        $request->validate([
            'message' => 'required',
        ]);
        //$user = Auth::user();
        $user = Chat::find($from_id);

        //check if user is activated

        $active = Chat::find($from_id);
        if ($active->active) {
            $message = new Message;
            $message->from_id = $from_id;
            $message->to_id = $to_id;
            $message->message = $request->message;
            $message->save();
            broadcast(new MessageSent($message))->toOthers();
            return ['status' => 'Message Sent!'];
        }
    }



    //get the one making request messages
    public function getChats($from_id, $to_id)
    {
        $messages = collect(Message::with('user')->where('from_id', $from_id)->get());
        $uniqueMessages = $messages->unique('to_id')->values()->all();

        return response()->json($uniqueMessages);
    }



    //start a chat / start a conversation
    //method to persist information of the person that wants to start a chat
    public function requestLiveChat(Request $request)
    {

        //validate the inputs
        $request->validate([
            'username' => 'required|string|min:3|max:15',
            'message' => 'required|string'
        ]);

        //save to database
        $user = Chat::create([
            'name' => $request->username,
            'active' => true,
        ]);

        $message = new Message;
        $message->from_id = $user->id;;
        $message->to_id = 6;
        $message->message =$request->message;
        $message->save();

        broadcast(new MessageSent($message))->toOthers();

        //return the created user
        return response()->json($user);
    }


    //Accept to chat with user
    public function acceptChat(Request $request, $id)
    {

        $user = Auth::user();
        $chat = Chat::find($id);
        $chat->user_id = $user->id;
        $chat->active = true;
        $chat->update();

        $message = new Message;
        $message->from_id = $user->id;;
        $message->to_id = $id;
        $message->message = "Your are now connected with an agent";
        $message->save();

        broadcast(new MessageSent($message))->toOthers();
    }



    //fetch chats / messages not attended to
    public function fetchRequestedChats()
    {
        $requested = Chat::where('active', 0)->get();
        return response()->json($requested);
    }


    //fetch all chats
    public function fetchAllRequestedChats()
    {
        $requested = Chat::orderByDesc('created_at')->get();
        return response()->json($requested);
    }


    //find chatting with
    public function chattingWith($id)
    {
        $data = Chat::findOrFail($id);

        return response()->json($data);
    }


    //close the chat / conversation
    public function closeChat($id)
    {
        $user = Chat::findOrFail($id);
        $user->active = false;
        $user->update();

        return response()->json(['message' => 'closed']);
    }


    //fetch messages
    public function fetchMessages()

    {
        return Message::with('user')->get();
    }





    //persist/store message to database
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $message = $user->messages()->create([
            'message' => $request->message
        ]);

        broadcast(new MessageSent($message))->toOthers();
        return ['status' => 'Message Sent!'];
    }
}
