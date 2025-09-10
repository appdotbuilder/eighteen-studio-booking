<?php

namespace Database\Seeders;

use App\Models\Studio;
use Illuminate\Database\Seeder;

class StudioSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $studios = [
            [
                'name' => 'Studio A - EIGHTEEN COURSE & STUDIO\'S',
                'description' => 'Studio premium dengan akustik terbaik, cocok untuk recording vokal dan instrument. Dilengkapi dengan soundproofing berkualitas tinggi dan monitoring system yang jernih. Ideal untuk musisi profesional dan pemula.',
                'price_per_hour' => 150000,
                'equipment_list' => [
                    'Drum Set Mapex Armory Series',
                    'Gitar Listrik Fender Stratocaster',
                    'Bass Yamaha TRBX304',
                    'Keyboard Roland RD-2000',
                    'Mikrofon Shure SM58',
                    'Mikrofon Condenser Audio-Technica AT2020',
                    'Amplifier Marshall DSL40CR',
                    'Bass Amplifier Ampeg BA-115',
                    'Audio Interface Focusrite Scarlett 18i20',
                    'Monitor Studio KRK Rokit 8',
                    'Headphone Sony MDR-7506',
                    'Mixer Behringer X32',
                    'Stand Mikrofon Boom',
                    'Kabel Audio Premium',
                    'Pick Gitar & Strap',
                    'Stick Drum Vic Firth 5A'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Studio B - EIGHTEEN COURSE & STUDIO\'S',
                'description' => 'Studio compact yang nyaman untuk latihan band dan recording demo. Dilengkapi dengan peralatan standard berkualitas dan suasana yang mendukung kreativitas musik Anda.',
                'price_per_hour' => 100000,
                'equipment_list' => [
                    'Drum Set Pearl Roadshow',
                    'Gitar Listrik Epiphone Les Paul',
                    'Bass Ibanez GSR200',
                    'Keyboard Casio CT-X700',
                    'Mikrofon Shure SM57',
                    'Amplifier Fender Champion 40',
                    'Bass Amplifier Hartke HD15',
                    'Audio Interface PreSonus AudioBox USB 96',
                    'Monitor Studio Yamaha HS5',
                    'Headphone Audio-Technica ATH-M40x',
                    'Mixer Yamaha MG10XU',
                    'Stand Mikrofon',
                    'Kabel Audio',
                    'Pick & Accessories',
                    'Metronome Digital'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Studio Premium - EIGHTEEN COURSE & STUDIO\'S',
                'description' => 'Studio kelas premium dengan teknologi recording terdepan. Dilengkapi dengan control room terpisah, peralatan high-end, dan engineer profesional. Perfect untuk album recording dan project komersial.',
                'price_per_hour' => 300000,
                'equipment_list' => [
                    'Drum Set DW Collector\'s Series',
                    'Gitar Listrik Gibson Les Paul Studio',
                    'Gitar Akustik Taylor 814ce',
                    'Bass Fender American Professional',
                    'Keyboard Nord Stage 3',
                    'Synthesizer Moog Subsequent 37',
                    'Mikrofon Neumann TLM 102',
                    'Mikrofon Shure SM7B',
                    'Mikrofon Drum Kit (7-piece)',
                    'Amplifier Mesa Boogie Mark V',
                    'Bass Amplifier Ampeg SVT-3PRO',
                    'Audio Interface RME Fireface UFX+',
                    'Monitor Studio Genelec 8040B',
                    'Headphone Sennheiser HD 650',
                    'Pro Tools HDX System',
                    'Neve 1073 Preamp',
                    'Compressor DBX 160A',
                    'Reverb Unit Lexicon PCM92',
                    'DI Box Premium',
                    'Isolation Booth'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Studio Acoustic - EIGHTEEN COURSE & STUDIO\'S',
                'description' => 'Studio khusus untuk recording acoustic dan vokal dengan treatment akustik optimal. Suasana hangat dan intimate, cocok untuk singer-songwriter, jazz, dan folk music.',
                'price_per_hour' => 120000,
                'equipment_list' => [
                    'Gitar Akustik Martin D-28',
                    'Gitar Akustik Taylor 814ce',
                    'Gitar Classical Yamaha CG192C',
                    'Piano Akustik Yamaha U3',
                    'Cajon Schlagwerk CP404',
                    'Ukulele Kamaka HF-3',
                    'Mikrofon Condenser AKG C414',
                    'Mikrofon Ribbon Royer R-121',
                    'Preamp API 512c',
                    'Audio Interface Universal Audio Apollo Twin',
                    'Monitor Studio Dynaudio LYD 8',
                    'Headphone Beyerdynamic DT 770',
                    'DI Box Radial J48',
                    'Acoustic Treatment Premium',
                    'Music Stand',
                    'Comfortable Seating'
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Studio Electronic - EIGHTEEN COURSE & STUDIO\'S',
                'description' => 'Studio modern yang dirancang khusus untuk electronic music production. Dilengkapi dengan synthesizer analog dan digital terbaik, drum machine, dan software production terkini.',
                'price_per_hour' => 180000,
                'equipment_list' => [
                    'Synthesizer Moog Grandmother',
                    'Synthesizer Roland Jupiter-X',
                    'Drum Machine Roland TR-8S',
                    'Sampler Elektron Digitakt',
                    'Sequencer Elektron Analog Rytm',
                    'Keyboard Controller Native Instruments S88',
                    'Audio Interface RME Babyface Pro FS',
                    'Monitor Studio Adam A7X',
                    'Subwoofer Adam Sub8',
                    'Headphone Focal Listen Professional',
                    'MIDI Controller Ableton Push 2',
                    'Software Ableton Live Suite',
                    'Software Native Instruments Komplete',
                    'Compressor Hardware Empirical Labs Distressor',
                    'Effect Pedal Strymon BigSky',
                    'USB Hub & MIDI Interfaces'
                ],
                'is_active' => true,
            ]
        ];

        foreach ($studios as $studioData) {
            Studio::create($studioData);
        }
    }
}