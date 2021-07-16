<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function destinations(){
        $destinations = Destination::get();

        return response()->json($destinations);
    }


    //add a new destination
    public function store(Request $request){
        $request->validate([
            'destinationName' => 'required|string|min:3',
            'charge' => 'required',
            'station' => 'required|string',
            'phone' => 'required',
            'number_of_days' => 'required',
        ]);

        $add = new Destination();
        $add->name = $request->destinationName;
        $add->phone = $request->phone;
        $add->amount = $request->charge;
        $add->station = $request->station;
        $add->number_of_days = $request->number_of_days;
        $add->save();

        return response()->json('Destination Added succesfully');
        
    }


    //get a particular destination
    public function show($id){
        $destination = Destination::findOrFail($id);
        return response()->json($destination);
    }



    //update destination
    public function update(Request $request, $id){
        $request->validate([
            'destinationName' => 'required|string|min:3',
            'charge' => 'required',
            'station' => 'required|string',
            'phone' => 'required',
            'number_of_days' => 'required',
        ]);

        $add = new Destination();
        $add->name = $request->destinationName;
        $add->phone = $request->phone;
        $add->amount = $request->charge;
        $add->station = $request->station;
        $add->days = $request->number_of_days;
        $add->update();

        return response()->json('Destination Updated succesfully');

    }



    //Delete destination
    public function delete($id){
        $del = Destination::find($id);
        $del->delete();

        return response()->json('Destination Deleted succesfully');
    }
}
