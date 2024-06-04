<?php

namespace App\Filament\Resources\DesignResource\Pages;

use App\Filament\Resources\DesignResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateDesign extends CreateRecord
{
    protected static string $resource = DesignResource::class;

    protected static ?string $title = 'Nuevo Diseño';
    
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Diseño registrado exitosamente.';
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
        }
        return $data;
    }
}