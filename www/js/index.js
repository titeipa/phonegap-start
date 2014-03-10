/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/* Call like: WritingBoard('#canvasid'); */
function WritingBoard(el) {
    this.penColor = '#000000';
    this.penSize = 5;
    this.canvas = $(el); 
    this.context = this.canvas[0].getContext('2d');
    this.points = [];
    this.is_down = false;
    this.canvas.on('touchend touchstart touchmove touchleave', $.proxy(this.onEvent, this));
}

WritingBoard.prototype.onEvent = function(event) {
    event.preventDefault();
    switch (event.type) {
    case 'touchleave':
        this.is_down = false;
        this.points = [];
        break;
    case 'touchstart':
        this.is_down = true;
        break;
    case 'touchend':
        this.is_down = false;
        this.points = [];
        break;
    case 'touchmove':
        if (this.is_down) {
            this.points.push ({
                x: event.pageX - this.canvas.offset().left,
                y: event.pageY - this.canvas.offset().top
            });
            this.draw();
        }
        break;
    default:
        console.log('ignored');
    }
}

WritingBoard.prototype.draw = function() {
    if (this.points.length < 2) {
        return;
    }
    var p1 = this.points[this.points.length - 2];
    var p2 = this.points[this.points.length - 1];

    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.lineWidth = this.penSize;
    this.context.lineJoin = "round";
    this.context.lineCap = "round";
    this.context.strokeStyle = this.penColor;
    this.context.stroke();
}

var app = {
    initialize: function () {
        this.bind(); 
    },
    bind: function () {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function () {
        $(function(){
            var wb = new WritingBoard('#sketch');
        });
    }
};
