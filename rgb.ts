//% color="#228B22" weight=25 icon="\uf0b2"
namespace RGB {

    //% blockId=ModuleWorld_PWM_RGB block="RGB|(P12P13P14)|red %red|green %green|blue %blue"
    //% weight=2
    //% blockGap=20
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(red: number, green: number, blue: number): void {

        pins.analogWritePin(AnalogPin.P13, value1 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P14, value2 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P12, value3 * 1024 / 256);
    }
}