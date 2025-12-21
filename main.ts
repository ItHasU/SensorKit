//% color="#155DFC" icon="\uf0eb" block="RGB LED"
namespace RGB_Module {
    const red_pin = AnalogPin.P13;
    const green_pin = AnalogPin.P14;
    const blue_pin = AnalogPin.P12;
    //% blockId="RGB_setColor"
    //% block="set color|r %red|g %green|b %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function setColor(red: number, green: number, blue: number): void {
        pins.analogWritePin(red_pin, red * 1024 / 256);
        pins.analogWritePin(green_pin, green * 1024 / 256);
        pins.analogWritePin(blue_pin, blue * 1024 / 256);
    }
}

//% color="#155DFC" icon="\uf205" block="Button"
namespace Button_Module {
    const button_pin = DigitalPin.P0;

    //% blockId="Button_pressed"
    //% block="button is pressed"
    export function pressed(): boolean {
        pins.setPull(button_pin, PinPullMode.PullUp);
        return pins.digitalReadPin(button_pin) == 0;
    }
}

//% color="#155DFC" icon="\uf11b" block="Rocker"
namespace Rocker_Module {
    const x_pin = AnalogPin.P2;
    const y_pin = AnalogPin.P3;

    //% blockId="Rocker_up"
    //% block="is rocker up"
    export function isUp(): boolean {
        const y = pins.analogReadPin(y_pin);
        return (y > 700);
    }

    //% blockId="Rocker_down"
    //% block="is rocker down"
    export function isDown(): boolean {
        const y = pins.analogReadPin(y_pin);
        return (y < 100);
    }

    //% blockId="Rocker_left"
    //% block="is rocker left"
    export function isLeft(): boolean {
        const x = pins.analogReadPin(x_pin);
        return (x < 100);
    }

    //% blockId="Rocker_right"
    //% block="is rocker right"
    export function isRight(): boolean {
        const x = pins.analogReadPin(x_pin);
        return (x > 700);
    }
}

//% color="#155DFC" icon="\uf185" block="Photosensitive"
namespace Photosensitive_Module {
    const light_pin = AnalogPin.P3;

    //% blockId="Photo_light"
    //% block="light"
    export function light(): number {
        let value: number;
        value = 1024 - pins.analogReadPin(light_pin);
        return value;
    }
}

//% color="#155DFC" icon="\uf012" block="Infrared"
namespace Infrared_Module {
    const ir_pin = DigitalPin.P4;

    //% blockId="IR_ir"
    //% block="IR"
    export function IR(): boolean {
        pins.setPull(ir_pin, PinPullMode.PullUp);
        return pins.digitalReadPin(ir_pin) == 1;
    }
}

//% color="#155DFC" icon="\uf2c9" block="Temp./Hum."
namespace DTH11_Module {
    const dht11_pin = DigitalPin.P6;

    export enum DHT11Type {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,

        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,

        //% block="humidity(0~100)" enumval=2
        DHT11_humidity,
    }

    //% blockId="DHT11_temperature_C"
    //% block="temperature"
    export function temperature(): number {
        return _dht11value(DHT11Type.DHT11_temperature_C);
    }

    //% blockId="DHT11_humidity"
    //% block="humidity"
    export function humidity(): number {
        return _dht11value(DHT11Type.DHT11_humidity);
    }

    function _dht11value(dht11type: DHT11Type): number {
        pins.digitalWritePin(dht11_pin, 0);
        basic.pause(18);
        let i = pins.digitalReadPin(dht11_pin);
        pins.setPull(dht11_pin, PinPullMode.PullUp);
        switch (dht11type) {
            case 0:
                let dhtvalue1 = 0;
                let dhtcounter1 = 0;
                let dhtcounter1d = 0;
                while (pins.digitalReadPin(dht11_pin) == 1);
                while (pins.digitalReadPin(dht11_pin) == 0);
                while (pins.digitalReadPin(dht11_pin) == 1);
                for (let i = 0; i <= 32 - 1; i++) {
                    dhtcounter1d = 0
                    while (pins.digitalReadPin(dht11_pin) == 0) {
                        dhtcounter1d += 1;
                    }
                    dhtcounter1 = 0
                    while (pins.digitalReadPin(dht11_pin) == 1) {
                        dhtcounter1 += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter1 > dhtcounter1d) {
                            dhtvalue1 = dhtvalue1 + (1 << (31 - i));
                        }
                    }
                }
                return ((dhtvalue1 & 0x0000ff00) >> 8);
                break;
            case 1:
                while (pins.digitalReadPin(dht11_pin) == 1);
                while (pins.digitalReadPin(dht11_pin) == 0);
                while (pins.digitalReadPin(dht11_pin) == 1);
                let dhtvalue = 0;
                let dhtcounter = 0;
                let dhtcounterd = 0;
                for (let i = 0; i <= 32 - 1; i++) {
                    dhtcounterd = 0
                    while (pins.digitalReadPin(dht11_pin) == 0) {
                        dhtcounterd += 1;
                    }
                    dhtcounter = 0
                    while (pins.digitalReadPin(dht11_pin) == 1) {
                        dhtcounter += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter > dhtcounterd) {
                            dhtvalue = dhtvalue + (1 << (31 - i));
                        }
                    }
                }
                return Math.round((((dhtvalue & 0x0000ff00) >> 8) * 9 / 5) + 32);
                break;
            case 2:
                while (pins.digitalReadPin(dht11_pin) == 1);
                while (pins.digitalReadPin(dht11_pin) == 0);
                while (pins.digitalReadPin(dht11_pin) == 1);

                let value = 0;
                let counter = 0;
                let counterd = 0;

                for (let i = 0; i <= 8 - 1; i++) {
                    counterd = 0
                    while (pins.digitalReadPin(dht11_pin) == 0) {
                        counterd += 1;
                    }
                    counter = 0
                    while (pins.digitalReadPin(dht11_pin) == 1) {
                        counter += 1;
                    }
                    if (counter > counterd) {
                        value = value + (1 << (7 - i));
                    }
                }
                return value;
            default:
                return 0;
        }
    }
}

//% color="#155DFC" icon="\uf027" block="Ultrasonic"
namespace Ultrasonic_Module {
    const trig_pin = DigitalPin.P8;
    const echo_pin = DigitalPin.P9;

    //% blockId="Ultrasonic_distance"
    //% block="distance"
    export function distance(): number {
        // send pulse
        pins.setPull(trig_pin, PinPullMode.PullNone);
        pins.digitalWritePin(trig_pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig_pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig_pin, 0);

        // read pulse, maximum distance=500cm
        const d = pins.pulseIn(echo_pin, PulseValue.High, 500 * 58);

        return Math.idiv(d, 58);
    }
}

//% color="#155DFC" icon="\uf108" block="Digital Tube"
namespace DigitalTube_Module {
    //% block
    export function test() { }
}

//% color="#155DFC" icon="\uf007" block="Human Body"
namespace HumanBodyInfrared_Module {
    const pir_pin = DigitalPin.P10;

    //% blockId="PIR_motion"
    //% block="motion"
    export function motion(): boolean {
        pins.setPull(pir_pin, PinPullMode.PullDown);
        pins.digitalWritePin(pir_pin, 1);
        return pins.digitalReadPin(pir_pin) == 1;
    }

}

//% color="#155DFC" icon="\uf06e" block="Color Rec."
namespace ColorRecognition_Module {
    //% block
    export function test() { }
}

//% color="#155DFC" icon="\uf085" block="Servo"
namespace Servo_Module {
    export enum mwServoNum {
        //% blockId="P1" block="P1"
        P1 = 1,
        //% blockId="P4" block="P4"
        P4 = 2,
        //% blockId="P2" block="P2"
        P2 = 3,
        //% blockId="P10" block="P10"
        P10 = 4
    }

    //% blockId=Servo_setAngle 
    //% block="set angle|pin %ServoNum|value %value"
    //% value.min=0 value.max=360
    export function setAngle(ServoNum: mwServoNum, value: number): void {
        let pin;
        if (ServoNum == 1) { pin = AnalogPin.P1; }
        else if (ServoNum == 2) { pin = AnalogPin.P4; }
        else if (ServoNum == 3) { pin = AnalogPin.P2; }
        else if (ServoNum == 4) { pin = AnalogPin.P10; }

        pins.servoSetPulse(pin, Math.map(value, 0, 360, 500, 2500))
    }
}
